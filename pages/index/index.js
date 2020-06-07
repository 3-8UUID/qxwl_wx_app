const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '首页',
        addPost: app.globalData.imgBase + 'addPost.png',
        titleImage: app.globalData.imgBase + 'indexTitle.jpg',
        active: 'home',
        searchDot: true,
        myInfo: 3,
        titleList: [
            {
                title: "推荐",
                context: "",
            }, {
                title: "关注",
                context: "",
                dot: true
            }, {
                title: "水库宝塔",
                context: "",
            }, {
                title: "乡村美食",
                context: "",
            }, {
                title: "清溪博物馆",
                context: "",
            }, {
                title: "瑶族文化",
                context: "",
            }, {
                title: "中国香柚之乡",
                context: "",
            }, {
                title: "女书",
                context: "",
            }, {
                title: "其他",
                context: "",
            },
        ],
        postList: [
            {
                id: 1,
                title: '帖子标题',
                author: '文章作者奥斯丁是',
                like: 1259,
                likeFlag: false,
                comm: 20,
                collect: 162,
                collectFlag: false,
            }, {
                id: 2,
                title: '快乐的田园生活',
                author: '文章作者',
                like: 1259,
                likeFlag: false,
                comm: 20,
                collect: 162,
                collectFlag: false,
            }, {
                id: 3,
                title: '早餐开餐',
                author: '文章作者',
                like: 1259,
                likeFlag: false,
                comm: 20,
                collect: 162,
                collectFlag: false,
            }, {
                id: 4,
                title: '瑶族特色菜',
                author: '文章作者',
                like: 1259,
                likeFlag: false,
                comm: 20,
                collect: 162,
                collectFlag: false,
            }, {
                id: 5,
                title: '名族文化传统美德',
                author: '文章作者',
                like: 1259,
                likeFlag: false,
                comm: 20,
                collect: 162,
                collectFlag: false,
            }, {
                id: 6,
                title: '四川境内',
                author: '文章作者',
                like: 1259,
                likeFlag: false,
                comm: 20,
                collect: 162,
                collectFlag: false,
            },
        ],
        indexModel: true,
        searchModel: false,
        myModel: false,
        searchResult: [
            {
                id: 1,
                title: '公司里的活灵活现0',
                text: '对于一个企业而言，团队管理关系的的关窗ask你才是卡巴测试卡好的卡' +
                    '是捷克立即离开昂克赛拉打开拉萨接待客户看见了卡i拉手机打开拉萨的环境',
            }, {
                id: 2,
                title: '公司里的活灵活现1',
                text: '对于一个企业而言，团队管理关系的的关窗ask你才是卡巴测试卡好的卡' +
                    '是捷克立即离开昂克赛拉打开拉萨接待客户看见了卡i拉手机打开拉萨的环境',
            }, {
                id: 3,
                title: '公司里的活灵活现2',
                text: '对于一个企业而言，团队管理关系的的关窗ask你才是卡巴测试卡好的卡' +
                    '是捷克立即离开昂克赛拉打开拉萨接待客户看见了卡i拉手机打开拉萨的环境',
            }, {
                id: 4,
                title: '公司里的活灵活现3',
                text: '对于一个企业而言，团队管理关系的的关窗ask你才是卡巴测试卡好的卡' +
                    '是捷克立即离开昂克赛拉打开拉萨接待客户看见了卡i拉手机打开拉萨的环境',
            },
        ],
        searchLoading: true,
        searchValue: '',
        newsNotice: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。',
        divider: true,
        iconLoading: true,
        itemLoading: true,
        userInfo: {},
        /////////////////////////////////
        avatar: app.globalData.imgBase + 'avatar.png',
        man: app.globalData.imgBase + 'man.png',
        woman: app.globalData.imgBase + 'woman.png',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // app.checkLogin('/pages/order/order/order')
        wx.setNavigationBarTitle({
            title: this.data.navigationBarTitle,
        })
        let myFunctionList = app.globalData.myFunctionList;
        let sysFunctionList = app.globalData.sysFunctionList;
        this.setData({
            myFunctionList: myFunctionList,
            sysFunctionList: sysFunctionList
        })
        setTimeout(() => {
            this.setData({
                itemLoading: false,
            })
        }, 1500);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: this.data.navigationBarTitle,
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // 加载数据
        this.loadData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 获取数据
     */
    loadData() {
        console.log("数据加载中。。。")
    },

    /**
     * 切换下边栏
     * @param e
     */
    tabChange(e) {
        let active = e.detail;
        console.log('[active]', active);
        let searchDot = true;
        let myInfo = 3;
        let navigationBarTitle = '首页';
        let indexModel = false;
        let searchModel = false;
        let myModel = false;

        switch (active) {
            case "home":
                navigationBarTitle = "首页"
                indexModel = true
                searchModel = false
                myModel = false
                break;
            case "search":
                searchDot = false
                navigationBarTitle = "搜索"
                searchModel = true
                indexModel = false
                myModel = false
                break;
            case "my":
                myInfo = ''
                navigationBarTitle = "我的"
                searchModel = false
                indexModel = false
                myModel = true
                break;
        }

        this.setData({
            active: active,
            searchDot: searchDot,
            myInfo: myInfo,
            navigationBarTitle: navigationBarTitle,
            indexModel: indexModel,
            searchModel: searchModel,
            myModel: myModel

        });
        this.onShow();

    },
    //////////////////////////首页///////////////////////////////
    /**
     * 标签点击事件
     * @param e
     */
    titleClick(e) {

    },
    /**
     * 喜欢点击事件
     * @param e
     */
    likeClick: function (e) {
        let that = this;
        console.log(e)
        let id = e.currentTarget.dataset.value;
        that.data.postList.forEach((item, index) => {
            if (item.id == id) {
                let num = 0;
                let flag = false;
                if (item.likeFlag) {
                    num = --item.like;
                    flag = false;
                    wx.showToast({
                        title: "取消点赞!",
                        icon: 'none'
                    })
                } else {
                    num = ++item.like;
                    flag = true;
                    wx.showToast({
                        title: "点赞成功!",
                        icon: 'none'
                    })
                }
                that.setData({
                    [`postList[${index}].like`]: num,
                    [`postList[${index}].likeFlag`]: flag,
                })
            }
        })
    },
    /**
     * 评论点击事件
     * @param e
     */
    commClick(e) {
        //1.进去文章详情
        //2.展开评论
        console.log(e);
    },
    /**
     * 收藏点击事件
     * @param e
     */
    collectClick(e) {
        let that = this;
        let id = e.currentTarget.dataset.value;
        that.data.postList.forEach((item, index) => {
            if (item.id == id) {
                let flag = false;
                if (item.collectFlag) {
                    wx.showToast({
                        title: "取消收藏!",
                        icon: 'none'
                    })
                } else {
                    flag = true;
                    wx.showToast({
                        title: "收藏成功!",
                        icon: 'none'
                    })
                }
                that.setData({
                    [`postList[${index}].collectFlag`]: flag,
                })
            }
        })
    },
    /**
     * 点击发布
     * @param e
     */
    addPost(e){
        wx.navigateTo({
          url: '/pages/index/addPost/add',
        })

    },
    //////////////////////////搜索页///////////////////////////////
    /**
     * 搜索值变更
     */
    searchChange(e) {
        console.log('onChange', e)
        this.setData({
            searchValue: e.detail.value,
        })
    },
    /**
     * 获得焦点
     */
    searchFocus(e) {
        console.log('onFocus', e)
    },
    /**
     * 失去焦点
     */
    searchBlur(e) {
        console.log('onBlur', e)
    },
    /**
     * 搜索点击
     */
    searchConfirm(e) {
        console.log('onConfirm', e)
        this.setData({
            searchLoading: false,
        })
    },
    /**
     * 清除
     */
    searchClear(e) {
        console.log('onClear', e)
        this.setData({
            searchValue: '',
            divider: false
        })
    },
    /**
     * 取消搜索
     */
    searchCancel(e) {
        console.log('onCancel', e)
        this.setData({
            divider: false
        })
    },
    /////////////////////////////我的///////////////////// //////////
    /**
     * 获取用户信息
     * @param e
     */
    getUserInfo: function (e) {

    },
    /**
     * 头像点击事件
     * @param e
     */
    avatarClick(e) {
        console.log('avatarClick', e)

    },
    /**
     * 用户信息点击事件
     * @param e
     */
    userInfoClick(e) {
        console.log('userInfoClick', e)
    }
})