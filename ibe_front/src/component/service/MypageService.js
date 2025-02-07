import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/members/mypage`

let accessToken = localStorage.getItem('accessToken');
const headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
}

// 포인트 조회
export const getMemberPoint = () => axios.get(`${REST_API_URL}/point`, headers );

// 멤버 정보 조회
export const getMemberInfo = () => axios.get(`${REST_API_URL}`, headers );

// 멤버 정보 변경
export const updateMemberInfo = (data) => {
    return axios.put(`${REST_API_URL}/updateinfo`, data, headers);
};

// 멤버 비밀번호 확인
export const checkMemberPw = (data) => {
    return axios.post(`${REST_API_URL}/checkpw`, data, headers);
};

// 멤버 비밀번호 변경
export const updateMemberPw = (data) => {
    return axios.put(`${REST_API_URL}/updatepw`, data, headers);
};

// 멤버 탈퇴
export const updateMemberDel = (data) => {
    return axios.put(`${REST_API_URL}/updatedel`, data, headers);
};
