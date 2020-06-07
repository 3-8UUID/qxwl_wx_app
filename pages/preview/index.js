const app = getApp();
import Dialog from '../../lib/vant-weapp/dialog/dialog';
import {$wuxDialog} from '../../lib/wux-weapp/index'
import Toast from "../../lib/vant-weapp/toast/toast";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '预览',
        contentList: [],
        titleImg: '',
        title: '',
        scrollTop : 0,
        now:'',
        /////////////////////////////////
        avatar: app.globalData.imgBase + 'avatar.png',
        loading: app.globalData.imgBase + 'loading.png',

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: this.data.navigationBarTitle,
        })
        let title = options.title;
        let titleImg = options.titleImg;
        let contents = JSON.parse(options.contents);
        this.setData({
            title: title,
            contentList: contents,
            titleImg: titleImg,
            now: new Date().getTime(),
        })
        console.log(contents);
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

    onChange(event){
        console.log(event.detail,'click right menu callback data')
    },

    //页面滚动执行方式
    onPageScroll(event){
        this.setData({
            scrollTop : event.scrollTop
        })
    }
})