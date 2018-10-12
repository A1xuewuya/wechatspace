// 从外部js加载数据或配置 注意只能是相对路径
var post_data = require("../../data/posts-data.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onPostTap: function (event) {
        console.log("---点击---");
        var pid = event.currentTarget.dataset.pid
        wx.navigateTo({
            url: "./post-detail/post-detail?pid=" + pid
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("---onLoad---页面初始化");

        // 初始化数据方法1
        this.setData({
            post_key: post_data.postList
        })

        //初始化数据方法2
        // this.data.post_list = post_data.post_key
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("---onReady---页面渲染完成");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("---onShow---页面渲染");
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("onHide");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload");
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("onPullDownRefresh");
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

    }
})