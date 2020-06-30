const app = getApp();
import Dialog from '../../../lib/vant-weapp/dialog/dialog';
import {$wuxDialog} from '../../../lib/wux-weapp/index'
import Toast from "../../../lib/vant-weapp/toast/toast";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '发布文章',
        addTitle: '点击设置标题',
        addContext: '',
        addImage: app.globalData.imgBase + 'add.png',
        /////////////////////////////////
        contentList: [
            {
                imgPath: '',
                content: ''
            }
        ],
        titleImg: '',
        indexFlag: true, //是否上传了图片
        previewLoading: false,
        releaseLoading: false,
        typeOptVisible: false,
        typeList: [],
        currentType: '',
        actionBtn: [
            {
                name: '取消'
            },
            {
                name: '发布',
                color: '#05adef',
                loading: false
            }
        ]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


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
///////////////////////////////////////////////////////
    /**
     * 添加图片
     * @param e
     */
    addImage(e) {
        //第一次上传封面+内容:101 只更换封面:102 只上传内容图:103 更换图片：104
        let titleFlag = e.currentTarget.dataset.value;
        this.uploadAttach(titleFlag);
    },

    /**
     * 选择上传方式
     */
    uploadAttach: function (titleFlag, index) {
        let that = this;
        let data = {
            titleFlag: titleFlag,
            index: index,
        }
        wx.showActionSheet({
            itemList: ['拍照', '从手机相册中选'],
            success: function (res) {
                if (1 == res.tapIndex) {
                    //从手机中获取相册上传
                    data.type = 'album';
                    // that.chooseWxImage('album', titleFlag);
                } else if (0 == res.tapIndex) {
                    //拍照上传
                    // that.chooseWxImage('camera', titleFlag);
                    data.type = 'camera';
                }
                that.chooseWxImage(data);
            }
        })


    },

    /**
     * 图片上传
     * @param type
     * @param files 展示列表
     * @param data 数据信息(relationId, folder, [source])
     */
    chooseWxImage: function (param) {
        console.log('[param]', param);
        let that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [param.type],
            success: function (res) {
                let filePath = res.tempFilePaths[0];
                let contents = that.data.contentList
                let text = param.index >= 0 ? contents[param.index].content : '';
                let content = {
                    imgPath: filePath,
                    content: text
                }
                switch (param.titleFlag) {
                    case '101':
                        //第一次上传
                        that.setData({
                            titleImg: filePath,
                            indexFlag: false,
                            contentList: [].concat(content)
                        })
                        break;
                    case '102':
                        //切换封面
                        that.setData({
                            titleImg: filePath,
                        })
                        break;
                    case '103':
                        //添加图片
                        param.index++;
                        content.content = '';
                        contents.splice(param.index, 0, content);
                        that.setData({
                            contentList: contents
                        })
                        break;
                    case '104':
                        //切换模块图
                        contents.forEach((t, i) => {
                            if (i == param.index) {
                                t.imgPath = filePath
                                t.content = t.content
                            }
                        })
                        console.log('[content]', contents);
                        contents.splice(param.index, 1, content);
                        console.log('[contents]', contents);
                        that.setData({
                            contentList: contents
                        })
                        break;
                    default:
                        break;
                }
                console.log('[contentList]', that.data.contentList);
            }
        })
    },

    /**
     * 上传服务器
     * @param param
     */
    fileUpload(param) {
        let that = this;
        wx.uploadFile({
            url: app.globalData.domain + '/qms/inspect/sample/avatar/upload',
            filePath: param.filePath,
            name: 'file',
            formData: param.data, //原始inspectCommission-ID 改为inspectInfo-ID存储
            header: param.header,
            timeout: 10000,
            success(res) {
                //json字符串 需用JSON.parse 转
                if (200 == res.statusCode) {
                    let jsonResult = JSON.parse(res.data)
                    console.log('jsonResult');
                    console.log(jsonResult);
                    if (jsonResult.success) {
                        let imgUrl = app.globalData.domain + jsonResult.result.attachLocation + jsonResult.result.attachName + '.PNG'
                        console.log(imgUrl);
                        that.setData({})
                        //TODO 刷新数据
                        that.loadData();
                        Toast.success(jsonResult.errmsg);
                    } else {
                        that.setData({})
                        Toast.fail('网络连接失败!');
                    }
                } else {
                    Toast.fail('网络连接失败！');
                }
            }
        })
    },

    /**
     * 切换文章标题
     * @param e
     */
    changeTitle() {
        let that = this;
        const alert = (content) => {
            $wuxDialog('#wux-dialog--alert').alert({
                resetOnClose: true,
                title: '提示',
                content: content,
            })
        }
        $wuxDialog().prompt({
            resetOnClose: true,
            title: '文章标题',
            content: '请输入文章标题',
            defaultText: '',
            placeholder: '请输入文章标题',
            maxlength: 16,
            onConfirm(e, response) {
                let content = '';
                if (response.length > 0) {
                    content = `成功修改标题为: ${response}`
                    that.setData({
                        addTitle: response
                    })
                } else {
                    content = `标题不能少于一字`
                }
                alert(content)
            },
        })
    },

    /**
     * 修改内容图片
     * @param e
     */
    changeImg(e) {
        let index = e.currentTarget.dataset.index;
        this.uploadAttach('104', index);
    },

    /**
     * 保存文字描述
     * @param e
     */
    saveContext(e) {
        let index = e.currentTarget.dataset.index;
        let contents = this.data.contentList;
        let content = {
            imgPath: contents[index].imgPath,
            content: e.detail.value
        };
        contents.splice(index, 1, content);
        this.setData({
            contentList: contents
        })
        console.log('[contents]change', this.data.contentList);
    },

    /**
     * 添加图标点击事件
     * @param e
     */
    addIconHandler(e) {
        let index = e.currentTarget.dataset.index;
        this.uploadAttach('103', index);
    },

    /**
     * 删除模块
     * @param e
     */
    delContent(e) {
        let index = e.currentTarget.dataset.index;

        Dialog.confirm({
            title: '删除确认',
            message: '您确认要删除小模块吗(若保留文字先复制哟)',
            asyncClose: true
        }).then(() => {
            setTimeout(() => {
                let contents = this.data.contentList
                contents.splice(index, 1);
                this.setData({
                    contentList: contents
                })
                Toast.success("删除成功！")
                Dialog.close();
            }, 1000);
        }).catch(() => {
            Dialog.close();
        });
    },

    /**
     * 预览按钮
     */
    previewClick() {
        let that = this;
        that.setData({
            previewLoading: true
        })
        let contents = JSON.stringify(this.data.contentList);
        let titleImg = this.data.titleImg;
        let title = this.data.addTitle;
        setTimeout(() => {
            wx.navigateTo({
                url: '/pages/preview/index?contents=' + contents + '&titleImg='
                    + titleImg + '&title=' + title,
            })
            that.setData({
                previewLoading: false,

            })
        }, 3000)
    },

    /**
     * 发布按钮
     */
    typeCheck() {
        let that = this;
        that.setData({
            // releaseLoading: true
            typeOptVisible: true,
            typeList: app.globalData.typeList
        })
        console.log(that.data.typeList);
    },

    /**
     * 选择文章类型
     * @param e
     */
    handleTypeChange({ detail = {} }){
        this.setData({
            currentType: detail.value
        });
    },

    /**
     * 发布按钮
     */
    releaseClick({ detail }) {
        console.log('[detail]',detail);
        let that = this;
        if (detail.index === 0) {
            that.setData({
                typeOptVisible: false
            });
        } else {
            const action = that.data.actionBtn;
            action[1].loading = true;

            this.setData({
                actionBtn: action
            });

            let typeId = '';
            const types = that.data.typeList;
            types.forEach((item,index)=>{
                let type = that.data.currentType;
                if (type){
                    if (item.typeName = type){
                        typeId = item.id
                    }
                }else {
                    let len = types.length - 1;
                    typeId = types[len].id

                }
            })
            const requestBo = {
                postTitle: that.data.addTitle,
                postTitleImg: that.data.titleImg,
                contentList: that.data.contentList,
                typeId: typeId
            }

            let filePaths = [that.data.titleImg];
            let url = 'http://localhost:9090/qxwl/source/fileUp';
            // let url = app.globalData.reqUrlBase + '/qxwl/source/fileUp';
            this.uploadFile(url,'',that.data.titleImg)

            console.log(requestBo);

            setTimeout(() => {
                action[1].loading = false;
                this.setData({
                    typeOptVisible: false,
                    actionBtn: action
                });


/*
                $Message({
                    content: '发布成功！',
                    type: 'success'
                });*/
                //跳转到首页
            }, 2000);
        }
    },
    /**
     * 文件上传
     * @param url 上传文件地址
     * @param data 上传参数
     * @param path 上传临时路径
     * @returns {{success}|any}
     */
    uploadFile(url, data, path) {
        let that = this;
        let header = {
            // auth_token: wx.getStorageSync('auth_token'),
            // auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTI3NjM3MzMsImlhdCI6MTU5MjIwMzI5Nywicm9sIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwidXNlcm5hbWUiOiJrdWFuIn0.UlQd_p8i9loAgSpjrm1vsULGOosbeoVei_LrLZLoe7k',
            auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTI3NjUyMjAsImlhdCI6MTU5MjIwNDc4NCwicm9sIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwidXNlcm5hbWUiOiJrdWFuIn0.HX-qlJMX5YU5kOe57Y1wN9lar_rw57KX3QlP00flUmY',
        }
        wx.uploadFile({
            // url: app.globalData.domain + url,
            url: url,
            filePath: path,
            name: 'file',
            formData: data,
            header: header,
            timeout: 10000,//10s超时
            success(res) {
                console.log('[res]',res);
                //json字符串 需用JSON.parse 转
                if (200 == res.statusCode) {
                    let jsonResult = JSON.parse(res.data)
                    console.log('jsonResult');
                    console.log(jsonResult);
                    if (jsonResult.success) {
                        Toast.success("上传成功！");

                        return jsonResult;
                    } else {
                        Toast.fail('网络连接失败!');
                    }
                } else {
                    Toast.fail('上传失败，网络连接超时');
                }
            }
        })
    },


})