import { axiosBeInstance, axiosChatInstance } from '../axios';

export interface JoinChatRoomParams {
  channelId: string;
}

const joinChatRoom = async (params: JoinChatRoomParams): Promise<object> => {
  return axiosChatInstance.post(
    `/center/api/v1/web/Channel/${params.channelId}/join`,
    {},
  );
};

export interface SuggestTextResponseType {
  data?: string[];
  message?: string;
  status?: string;
}
const getSuggestTexts = async (): Promise<SuggestTextResponseType> => {
  return axiosBeInstance.get(
    `/api/v7.1_w/bigdata/hermes/v1/bot/template/question/get`,
    {},
  );
};

export { joinChatRoom, getSuggestTexts };
