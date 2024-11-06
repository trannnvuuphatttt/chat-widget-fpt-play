import { axiosChatInstance } from '../axios';

export interface JoinChatRoomParams {
  channelId: string;
}

const joinChatRoom = async (params: JoinChatRoomParams): Promise<object> => {
  return axiosChatInstance.post(
    `/center/api/v1/web/Channel/${params.channelId}/join`,
    {},
  );
};

export { joinChatRoom };
