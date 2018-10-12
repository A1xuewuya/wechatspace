var util = require("../../utils/util.js")
var appInst = getApp();


Page({

	/**
	 * 页面的初始数据
	 */
    data: {
        searchResult: {},
        containerShow: true,
        searchPanelShow: false
    },

	/**
	 * 生命周期函数--监听页面加载
	 */
    onLoad: function (options) {
        var inTheatersUrl = "/v2/movie/in_theaters?start=0&count=3"
        var comingSoonUrl = "/v2/movie/coming_soon?start=0&count=3"
        var top250Url = "/v2/movie/top250?start=0&count=3"
        this.getMovieListData(appInst.globalData.g_baseUrl + inTheatersUrl, "inTheaters");
        this.getMovieListData(appInst.globalData.g_baseUrl + comingSoonUrl, "comingSonn");
        this.getMovieListData(appInst.globalData.g_baseUrl + top250Url, "top250");

    },

    getMovieListData: function (url, settedKey) {
        wx.request({
            url: url,
            data: {},
            header: {
                'content-type': 'application/xml'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                // console.log(result)
                this.processDoubanData(result, settedKey)
            },
            fail: () => {
                console.log("fail")
            },
            complete: () => {
                console.log("complete")
            }
        });
    },

    processDoubanData: function (data, settedKey) {
        console.log(data)
        var movies = []
        for (var index in data.data.subjects) {
            var subject = data.data.subjects[index]
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

            var readyData = {}
            readyData[settedKey] = {
                category: data.data.title,
                movies: movies
            }
        }
        this.setData(readyData)
    },

    onMoreTap: function (event) {
        // console.log(event)
        var category = event.currentTarget.dataset.category
        wx.navigateTo({
            url: '/pages/movies/more-movie/more-movie?category=' + category,
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
        });
    },

    onBindFocus: function () {
        console.log("获取焦点...")
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },

    onBindConfirm: function (event) {
        console.log("点击confirm....")
        var search_text = event.detail.value
        var searchUrl = appInst.globalData.g_baseUrl + "/v2/movie/search?q=" + search_text
        this.getMovieListData(searchUrl, "searchResult")

    },

    onCancelSearch: function () {
        console.log("点击了取消按钮...")
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            searchResult: {}
        })
    },

    onMovieTap: function (event) {
        var mid = event.currentTarget.dataset.mid
        wx.navigateTo({
            url: './movie-detail/movie-detail?mid=' + mid,
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
        });
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