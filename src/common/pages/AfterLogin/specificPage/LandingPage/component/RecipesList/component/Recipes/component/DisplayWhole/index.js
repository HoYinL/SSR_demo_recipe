import React, { useEffect, useState } from "react";
import { Card, CardHeader, Box, List, Avatar, Typography, ListItem } from "@mui/material";
import { PublicOutlined, HighlightOff } from "@mui/icons-material";
import { CardStyles } from "../Card/style";
import { WholeRecipeStyles } from "./style";

const DisplayWholeComponent = (props) => {
    const recipes = CardStyles();
    const wholeRecipeStyles = WholeRecipeStyles();

    const [displayAll, setDisplayAll] = useState(null);

    useEffect(() => {
        if (props.displayAll != undefined) {
            setDisplayAll(props.displayAll);
        }
    }, [props.displayAll]);

    return (
        <>
            {
                displayAll != null &&
                <Box>
                    <Box className={wholeRecipeStyles.root} />
                    <Card
                        ref={props.wholeDisplayedRecipe}
                        className={wholeRecipeStyles.recipeCard}
                        sx={{ backgroundImage: `url('${displayAll.feature.backgroundImg}')`, position: 'relative' }}
                    >
                            <HighlightOff
                                className={wholeRecipeStyles.deleteIcon}
                                onPointerUp={() => {
                                    props.setDisplayAll(null);
                                }}
                            />
                        <CardHeader
                            className={wholeRecipeStyles.cardHeader}
                            avatar={<Avatar src={displayAll.author.icon} />}
                            subheader={
                                <Box className={recipes.subheaderRoot}>
                                    <Typography className={recipes.subheaderCreateTime}>
                                        {displayAll.createAt.slice(0, 10)}
                                    </Typography>
                                    <PublicOutlined className={recipes.subheaderIcon} />
                                </Box>
                            }
                            title={displayAll.author.username}
                        />

                        <Box className={`${recipes.cardBody} ${wholeRecipeStyles.wholeCardBody}`}>
                            <Box className={recipes.description}>
                                <Typography className={recipes.dishName}>
                                    {displayAll.feature.dish_name}
                                </Typography>
                                <Box className={wholeRecipeStyles.description}>
                                    <Typography>{displayAll.feature.description}</Typography>
                                </Box>
                            </Box>
                            <List className={wholeRecipeStyles.tagListContainer}>
                                    {
                                        displayAll.feature.tagList != undefined &&displayAll.feature.tagList.map((tag) =>
                                        displayAll.feature.tagList.indexOf(tag) < 6 &&
                                            <ListItem
                                                className={recipes.tagList}
                                                key={tag}
                                            >
                                                {tag}
                                            </ListItem>
                                        )
                                    }
                            </List>
                        </Box>
                    </Card>
                </Box>
            }
        </>
    )
};

export default DisplayWholeComponent