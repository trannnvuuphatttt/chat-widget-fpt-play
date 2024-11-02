<template>
    <div>
        <h2>Connection Test</h2>

        <!-- Kiểm tra trạng thái kết nối API join room -->
        <div>
            <button @click="testConnection">Start Connection Test</button>
            <p>Join Room Status: {{ joinRoomStatus }}</p>
        </div>

        <!-- Kiểm tra trạng thái kết nối WebSocket -->
        <div>
            <p>WebSocket Status: {{ wsStatus }}</p>
        </div>

        <!-- Kiểm tra gửi tin nhắn đến API chatbot -->
        <div>
            <input v-model="testMessage" placeholder="Enter test message" :disabled="!wsConnected" />
            <button @click="sendTestMessage" :disabled="!wsConnected">Send Test Message</button>
            <p>Chatbot Response: {{ chatbotResponse }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            joinRoomStatus: 'Not tested', // Trạng thái kết nối API join room
            wsStatus: 'Not tested', // Trạng thái kết nối WebSocket
            ws: null,
            wsConnected: false, // Trạng thái kết nối WebSocket
            testMessage: '',
            chatbotResponse: '',
        };
    },
    methods: {
        // Hàm kiểm tra kết nối toàn bộ
        async testConnection() {
            this.joinRoomStatus = 'Testing join room...';
            const joined = await this.joinRoom();
            if (joined) {
                this.wsStatus = 'Testing WebSocket...';
                this.testWebSocket();
            }
        },

        // Hàm kiểm tra API join room
        async joinRoom() {
            try {
                const response = await axios.post(
                    'https://livechat-staging.fptplay.net/center/api/v1/web/Channel/c022b6027bdd4c258314c07a81986781/join',
                    { password: "" },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'platform': 'web',
                            'token': '2795893ee633a1386de1150f7f70c4daeb5a6842df531e8ed9c77968b7d316cfd26c114f3d8d2a07655b26e2b3cb95948afff51596464b19b965a70457c3f2f58778b6c6c031a048ccb395f081bd5dc9fac8a2e769e35cbcb56f086b6cfb79b4859705e1945cb758a555ce82f121f418f28aa2dd473decb7b21de4e9a6218a23031dff7f9d292cd6cc9db5c6bb89c6a667987c832a6a4a7f0d3f85670321e734cf8a4d5fef466f5b81e7840b99308a47cf297d1fbc0cd6bef1b8a068569a711342d865a327a8c29e79403da24000ce8de3fe6ab8fa3a112612834054e435e4e80cb902eb48dd36b79fb1d4cb5a0b0e95',
                        },
                    }
                );
                if (response.data && response.data.result) {
                    this.joinRoomStatus = 'Joined room successfully!';
                    return true;
                } else {
                    this.joinRoomStatus = 'Failed to join room.';
                    return false;
                }
            } catch (error) {
                this.joinRoomStatus = 'Error joining room.';
                console.error(error);
                return false;
            }
        },

        // Hàm kiểm tra WebSocket
        testWebSocket() {
            const wsUrl = 'wss://ws-livechat-staging.fptplay.net/livechat/c022b6027bdd4c258314c07a81986781?token=2795893ee633a1386de1150f7f70c4daeb5a6842df531e8ed9c77968b7d316cfd26c114f3d8d2a07655b26e2b3cb95948afff51596464b19b965a70457c3f2f58778b6c6c031a048ccb395f081bd5dc9fac8a2e769e35cbcb56f086b6cfb79b4859705e1945cb758a555ce82f121f418f28aa2dd473decb7b21de4e9a6218a23031dff7f9d292cd6cc9db5c6bb89c6a667987c832a6a4a7f0d3f85670321e734cf8a4d5fef466f5b81e7840b99308a47cf297d1fbc0cd6bef1b8a068569a711342d865a327a8c29e79403da24000ce8de3fe6ab8fa3a112612834054e435e4e80cb902eb48dd36b79fb1d4cb5a0b0e95';
            this.ws = new WebSocket(wsUrl);

            this.ws.onopen = () => {
                this.wsStatus = 'WebSocket connected';
                this.wsConnected = true;
            };

            this.ws.onclose = () => {
                this.wsStatus = 'WebSocket disconnected';
                this.wsConnected = false;
            };

            this.ws.onerror = (error) => {
                this.wsStatus = 'WebSocket error';
                console.error(error);
            };
        },

        // Hàm kiểm tra gửi tin nhắn đến API chatbot
        async sendTestMessage() {
            try {
                const response = await axios.post(
                    'https://api-staging.fptplay.net/api/v7.1_w/bigdata/hermes/v1/bot/messages/add',
                    {
                        query: this.testMessage,
                        profile_id: 'test_user',
                        session_uuid: 'test_session',
                        tw_ws: false,
                    },
                    {
                        headers: {
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                );
                this.chatbotResponse = response.data.data.answer.text || 'No response';
            } catch (error) {
                this.chatbotResponse = 'Error sending message';
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
h2 {
    color: #333;
}

button {
    margin-top: 10px;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
}

input {
    margin-top: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>