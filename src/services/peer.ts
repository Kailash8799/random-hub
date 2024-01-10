class PeerService {
    peer: RTCPeerConnection | undefined | null
    constructor() {
        if (!this?.peer || this.peer == undefined || this.peer == null) {
            this.peer = new RTCPeerConnection({
                'iceServers': [
                    {
                        "urls": "stun:global.stun.twilio.com:3478"
                    },
                    {
                        "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
                        "credential": "tE2DajzSJwnsSbc123",
                        "urls": "turn:global.turn.twilio.com:3478?transport=udp"
                    },
                    {
                        "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
                        "credential": "tE2DajzSJwnsSbc123",
                        "urls": "turn:global.turn.twilio.com:3478?transport=tcp"
                    },
                    {
                        "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
                        "credential": "tE2DajzSJwnsSbc123",
                        "urls": "turn:global.turn.twilio.com:443?transport=tcp"
                    }
                ],
            })
        }
    }
    async getOffer() {
        if (this.peer != undefined && this.peer != null && this.peer) {
            const offer = await this.peer.createOffer()
            await this.peer.setLocalDescription(offer);
            return offer;
        }
    }

    async getAnswer(offer: RTCSessionDescriptionInit) {
        if (this.peer != undefined && this.peer != null && this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(ans);
            return ans;
        }
    }

    async setLocalDescription(ans: RTCSessionDescriptionInit) {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }
}

export default new PeerService();