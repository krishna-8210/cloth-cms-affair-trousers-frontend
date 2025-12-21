export const msgPopup = (({ status, msg, messageApi }) => {
    if (status) { messageApi.open({ type: 'success', content: msg, }) }
    else {
        messageApi.open({ type: 'error', content: msg ? msg : 'error', });
    }
})
export const yt_link_extractor = (link) => {
    if (!link) {
        return { status: false, message: "please enter youtube link", id: null }
    }

    if (link.includes('youtube.com') === false) {
        return { status: false, message: "Invalid youtube link", id: null }
    }

    if (link.includes('live') === true) {
        console.log("type-live video");
        const id = link.split("/")[4]?.split("?")[0];
        console.log({ status: false, message: "Invalid youtube link", id: id });
        return { status: true, message: "", id: id }
    }

    if (link.includes('watch') === true) {
        let youtube_video_id = link.split("=")[1];

        if (youtube_video_id.includes('&')) {
            youtube_video_id = youtube_video_id.split('&')[0];
        }

        console.log(youtube_video_id);
        if (youtube_video_id) {
            return { status: true, message: "", id: youtube_video_id }
        }
        else {
            return { status: false, message: "Invalid youtube link", id: null }
        }
    }

    return { status: false, message: "Invalid link", id: null }






}



// extract index from select then match in array and return main data
export const select_handler=(index,array_list)=>{
const index_num=index.split('.')[1];
return array_list[index_num]
}


export const price_calculate=(item,metal_rate)=>{

   const data= {
    "per_gram": 10,
    "percentage": 5,
    "per_piece": 100
}
// const item_weight=Number(weight);
// const per_gram=making_data.per_gram*item_weight;
// const metal_rate=metal_rates[metal_type];
console.log(item,metal_rate);
    return {

    }

}