import ApiPath from "@/api/ApiPath";
import axios from 'axios';

export const getDictValue = (params) => { return axios.get(ApiPath.url.getDictValue+ "?type="+ params) };

export const dictTypeConst = {
    //启用禁用状态
    enableStatus: 'enable_status'
}
