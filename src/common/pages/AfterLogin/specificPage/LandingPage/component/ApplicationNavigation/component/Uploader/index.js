import React, { useState, useEffect, useRef } from "react";
import VideoUploaderStyles from "./style";
import { Box, Button, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { HighlightOff, RadioButtonChecked } from "@mui/icons-material";
import { isChildElement } from "../../../../../../commonComponent/function";
import { writeNewFile } from "../../../../../../../../../server/axios/api1";
import { blobToDataUrl } from "./function";

const VideoUploaderComponent = (props) => {
    const videoUploaderStyles = VideoUploaderStyles();

    const VideoConatiner = useRef(null);
    const VideoUploaderBlock = useRef(null);
    const recordingButton = useRef(null);
    const fileButton = useRef(null);
    const useref = useRef(null);
    const video = useRef(null);
    const cancel = useRef(null);
    const uploadBlock = useRef(null);
    const radioButton = useRef(null);

    const user = useSelector(state => state.token.token_payload);

    const [file, setFile] = useState('Mp4 File');
    const [webcam, setWebcam] = useState('Record Video');
    const [displayImg, setDisplayImg] = useState('');
    const [displayPreview, setDisplayPreview] = useState(false);
    const [dataUrl, setDataUrl] = useState('');
    const [isMobile, setIsMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    const [constraints, setConstraints] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);

    const gotLocalMediaStream = stream => {
        setDisplayPreview(true);

        window.stream = stream;
        video.current.srcObject = stream;
        setMediaRecorder(new MediaRecorder(stream))
    };

    const RecordingHandler = () => {
        switch (webcam) {
            case "Record Video":
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(gotLocalMediaStream);
                setWebcam("Start Recording");
                break;
            case "Start Recording":
                setRecording(true);
                mediaRecorder.start();
                setWebcam('Stop Recording');
                break;
            case "Stop Recording":
                setRecording(false);
                mediaRecorder.stop();
                setWebcam('Upload Recording');
                break;
            case "Upload Recording":
                writeNewFile(dataUrl, user.id)
                    .then((res) => {
                        props.setUpload(false);
                    })
                break;

        }
    };

    useEffect(() => {
        if (isMobile == false) {
            setConstraints({
                audio: false,
                video: {
                    facingMode: "environment",
                    width: 400,
                    height: 250
                }
            })
        } else {
            setConstraints({
                audio: false,
                video: {
                    facingMode: "user",
                    width: 400,
                    height: 250
                }
            })
        }
    }, [isMobile]);

    useEffect(() => {
        if (user != null) {
            if (typeof window != "undefined") {
                const fileReader = new window.FileReader();

                const file = document.getElementById("contentVideo-file");

                file.addEventListener("change", function (event) {
                    fileReader.readAsDataURL(this.files[0]);
                });

                fileReader.addEventListener('load', () => {
                    setDisplayImg(fileReader.result);
                    setFile("Upload Video");
                });
            }
        }
    }, [user]);

    useEffect(() => {
        if (useref.current == null) {
            useref.current = true;
        } else {
            setDisplayPreview(true);
            video.current.src = displayImg;
            video.current.load();
        }
    }, [displayImg]);

    useEffect(() => {
        VideoConatiner.current.addEventListener('pointerup', (e) => {
            if (
                !isChildElement(e.target, uploadBlock.current)
            ) {
                props.setUpload(false);
            }
        });
    }, []);

    useEffect(() => {
        if (mediaRecorder != null) {
            const chunks = [];

            mediaRecorder.addEventListener('dataavailable', (e) => {
                chunks.push(e.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const blob = new Blob(chunks, { type: 'video/mp4' });
                blobToDataUrl(blob).then(
                    (res) => setDataUrl(res)
                );
                chunks.length = 0; // reset
                window.stream.getTracks().map((track) => {
                    track.stop();
                });
            });

            return () => {
                mediaRecorder != null && mediaRecorder.state != 'inactive' && mediaRecorder.stop();
                window.stream.getTracks().map((track) => {
                    track.stop();
                });
            }
        }
    }, [mediaRecorder]);

    useEffect(() => {
        if (recording == true && recordingButton.current != null) {
            const recordingAnimation = setInterval(() => {
                if (radioButton.current.classList.contains(videoUploaderStyles.radioDisplay)) {
                    radioButton.current.classList.replace(videoUploaderStyles.radioDisplay, videoUploaderStyles.radioHidden);
                } else {
                    radioButton.current.classList.replace(videoUploaderStyles.radioHidden, videoUploaderStyles.radioDisplay);
                }

                if (recording == false) {
                    clearInterval(recordingAnimation);
                }
            }, 500);

            return () => {
                clearInterval(recordingAnimation)
            }
        }
    }, [recording]);

    useEffect(() => {
        if (dataUrl != '') {
            video.current.srcObject = null;
            video.current.src = dataUrl;
            video.current.load();
        }
    }, [dataUrl]);

    return (
        <>
            <input
                accept="video/*"
                style={{ display: 'none' }}
                id="contentVideo-file"
                multiple
                type="file"
            />

            <Box ref={VideoConatiner} className={videoUploaderStyles.root}>
                <Card
                    ref={uploadBlock}
                    className={videoUploaderStyles.uploadBlock}
                >
                    <HighlightOff
                        ref={cancel}
                        className={videoUploaderStyles.cancel}
                        onPointerUp={() => { props.setUpload(false) }}
                    />


                    <Box className={displayPreview == false ? videoUploaderStyles.emptyReelsPreviewContainer : videoUploaderStyles.reelsPreviewContainer}>
                        {
                            recording &&
                            <RadioButtonChecked
                                ref={radioButton}
                                className={`${videoUploaderStyles.radioDisplay} ${videoUploaderStyles.radio}`}
                            />
                        }
                        <video ref={video} style={{ objectFit: 'fill' }} autoPlay loop />
                    </Box>

                    <Box ref={VideoUploaderBlock} className={videoUploaderStyles.uploaderBlock}>
                        <Button
                            ref={recordingButton}
                            className={videoUploaderStyles.button}
                            onPointerUp={RecordingHandler}
                        >
                            {webcam}
                        </Button>


                        <Button
                            ref={fileButton}
                            className={videoUploaderStyles.button}
                            onPointerDown={(e) => {
                                if (file == "Upload Video") {
                                    writeNewFile(displayImg, user.id)
                                        .then((res) => {
                                            props.setUpload(false);
                                        })
                                }
                            }}
                        >
                            {
                                file == "Mp4 File" &&
                                <label htmlFor="contentVideo-file">
                                    <Typography>{file}</Typography>
                                </label>
                            }

                            {
                                file != "Mp4 File" && <Typography>{file}</Typography>
                            }
                        </Button>
                    </Box>
                </Card>
            </Box >
        </>
    )
};

export default VideoUploaderComponent