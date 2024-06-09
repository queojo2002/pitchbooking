import notifee, { AndroidStyle } from '@notifee/react-native';

export const showNotification = async (title, body, imageURL) => {
    try {
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId: 'D20CNTT01',
                style: {
                    type: AndroidStyle.BIGTEXT,
                    text: body,
                },
                showTimestamp: true,
                largeIcon: imageURL ? imageURL : require('../assets/logodth.png'),
            },
        });
    } catch (e) {
        console.log(e);
    }
};
