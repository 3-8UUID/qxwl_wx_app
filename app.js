//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        myFunctionList: [
            {
                title: '我的消息',
                url: '/pages/myPost/index',
                icon: 'chat-o',
                color: '',
                info:'3'
            },
            {
                title: '发布帖子',
                url: '/pages/myPost/index',
                icon: 'records',
                color: ''
            },
            {
                title: '精彩评论',
                url: '/pages/dashboard/index',
                icon: 'comment-o',
                color: 'blue'
            },
            {
                title: '喜欢作品',
                url: '/pages/dashboard/index',
                icon: 'like',
                color: 'red'
            },
            {
                title: '收藏夹',
                url: '/pages/dashboard/index',
                icon: 'star',
                color: 'yellow'
            },
        ],
        sysFunctionList: [
            {
                title: '意见反馈',
                url: '/pages/myPost/index',

            },
            {
                title: '关于',
                url: '/pages/myPost/index',

            },
            {
                title: '设置',
                url: '/pages/dashboard/index',
            },

        ],
        domain: 'http://47.102.208.247/',
        imgBase: 'http://47.102.208.247//download/image/',
    }
})