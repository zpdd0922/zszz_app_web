import uaInfo from '@/main/utils/common/ua-info';
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';
import { shareAppBtn } from '@/common/native-api/';

function setTitle(title, isShare) {
  if (!uaInfo.isApp()) {
    const t = title;
    document.title = t;
    BroadCast.send(BROADCAST_ENUMS.UPDATE_TITLE, {
      title: t
    });
  } else {
    const url = `${window.location.href}?share=${isShare ? 1 : 0}`;
    shareAppBtn({
      share: true,
      type: [
        'shareWXTimeline', 'appWXMessage', 'appQQMessage', 'appTwitter'
      ],
      data: {
        url, // 分享地址
        title, // 标题
        content: '', // 缩略区内容
        imgUrl: '' // 素略图URL
      }
    });
  }
}

export default setTitle;
