var appInst = getApp();
var util = require("../../../utils/util.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        d_category: "",
        d_reqUrl: "",
        d_totalCount: 0,
        d_isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取带过来的类别参数
        var category = options.category
        this.data.d_category = category
        var requrl = ""
        switch (category) {
            case "正在上映的电影-北京":
                requrl = appInst.globalData.g_baseUrl + "/v2/movie/in_theaters"
                break;
            case "即将上映的电影":
                requrl = appInst.globalData.g_baseUrl + "/v2/movie/coming_soon"
                break;
            case "豆瓣电影Top250":
                requrl = appInst.globalData.g_baseUrl + "/v2/movie/top250"
                break;
            default:
                break;
        }
        // 设置当前页面的url请求路径
        this.data.d_reqUrl = requrl
        // 发送网络请求
        util.http(requrl, this.processDoubanData)
    },

    onScrollToLower: function (event) {
        console.log("上拉加载...")
        // 导航条加载loading...
        wx.showNavigationBarLoading()
        var nextUrl = this.data.d_reqUrl + "?start=" + this.data.d_totalCount + "&count=20"
        util.http(nextUrl, this.processDoubanData)

    },


    // 处理网路请求获取到数据的回调函数
    processDoubanData: function (data) {
        var movies = []
        for (var index in data.subjects) {
            var subject = data.subjects[index]
            var title = subject.title
            if (title.length >= 6) {
                title = title.substring(0, 6) + "..."
            }
            // 组织数据
            var temp = {
                movieId: subject.id,
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                stars: util.stars2Array(subject.rating.stars)
            }
            movies.push(temp)
        }

        var totalMovies = {}
        // 如果要绑定新家在的数据，那么需要和旧的数据合并在一起
        if (!this.data.d_isEmpty) {
            totalMovies = this.data.movies.concat(movies)
        }
        else {
            totalMovies = movies
            this.data.d_isEmpty = false
        }

        // 设置下次拉取数据的起始
        this.data.d_totalCount += 20

        // 绑定数据
        this.setData({
            movies: totalMovies
        })

        // 关闭导航条加载loading
        wx.hideNavigationBarLoading()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.d_category,
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
        });
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