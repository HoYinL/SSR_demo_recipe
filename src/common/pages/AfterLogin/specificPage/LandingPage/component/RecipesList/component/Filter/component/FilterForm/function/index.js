const item_repeated = (map_target, item_id) => {
    let repeated = false;

    map_target.map((ele) => {
        ele.props.id == item_id ? repeated = true: null; 
    })

    return repeated
}

export { item_repeated }