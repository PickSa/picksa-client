export type questionType = {
    id:number,
    part:string,
    tag:string,
    is_confirm:boolean,
    content:string,
    writer:string,
    date:string,
}

export const questionForAllData = [
    {id:0, part:"all", tag:"tag1", is_confirm:true, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:1, part:"all", tag:"tag1", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:2, part:"all", tag:"tag2", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
];
export const questionForPMData = [
    {id:3, part:"pm", tag:"tag2", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:4, part:"pm", tag:"tag3", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:5, part:"pm", tag:"tag3", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
];
export const questionForDesignData = [
    {id:6, part:"design", tag:"tag1", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:7, part:"design", tag:"tag1", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:8, part:"design", tag:"tag2", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
];
export const questionForFEData = [
    {id:9, part:"fe", tag:"tag2", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:10, part:"fe", tag:"tag3", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:11, part:"fe", tag:"tag3", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
];
export const questionForBEData = [
    {id:12, part:"be", tag:"tag1", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:13, part:"be", tag:"tag2", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
    {id:14, part:"be", tag:"tag3", is_confirm:false, content:"내용입니다", writer:"김사자", date:"2023-12-25"},
];