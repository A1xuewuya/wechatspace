var postsData = require("../../../data/posts-data.js");
var app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isPlayingMusic: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var pid = options.pid;
		this.data.pid = pid;
		var postData = postsData.postList[pid];
		this.setData({
			post_data: postData
		});

		var postsCollected = wx.getStorageSync("posts_Collected");
		if (postsCollected) {
			var postCollected = postsCollected[pid]
			this.setData({
				collected: postCollected
			})
		}
		else {
			var postsCollected = {}
			postsCollected[pid] = false
			wx.setStorageSync("posts_Collected", postsCollected)
		}

		// 判断全局音乐播放状态
		if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPid == this.data.pid) {
			this.setData({
				isPlayingMusic: true
			})
		}

		// 设置及获取音乐状态
		this.setMusicMonitor()

	},

	setMusicMonitor: function () {
		// 监听音乐播放
		var that = this
		wx.onBackgroundAudioPlay(function () {
			that.setData({
				isPlayingMusic: true
			})
			// 设置全局音乐播放状态---播放
			app.globalData.g_isPlayingMusic = true
			app.globalData.g_currentMusicPid = that.data.pid
		})

		// 监听音乐暂停
		wx.onBackgroundAudioPause(function () {
			that.setData({
				isPlayingMusic: false
			})
			//设置全局音乐播放状态---暂停
			app.globalData.g_isPlayingMusic = false
			app.globalData.g_currentMusicPid = null
		})

		// 监听音乐停止
		wx.onBackgroundAudioStop(function () {
			that.setData({
				isPlayingMusic: false
			})
		})
	},

	onMusicTap: function () {
		if (this.data.isPlayingMusic) {
			wx.pauseBackgroundAudio()
			this.setData({
				isPlayingMusic: false
			})
		}
		else {
			wx.playBackgroundAudio({
				dataUrl: 'http://isure.stream.qqmusic.qq.com/C400004XQN6O2zuvzk.m4a?vkey=0711BC56F5996F7EEB031375697915752B22FE1BE716657921A14248BFB6FF707ED7ED624B1C3B5C2ABD657FD1CB90FBE7D0579C9AAE0F81&guid=9986510750&uin=1445383774&fromtag=66',
				title: '风信-李安-',
				coverImgUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001dS8qw2gSE1e.jpg?max_age=2592000&quot'
			})
			this.setData({
				isPlayingMusic: true
			})
		}
	},

	onCollectTap: function () {
		var postsCollected = wx.getStorageSync("posts_Collected")
		var postCollected = postsCollected[this.data.pid]
		// 收藏变为收藏 未收藏变收藏
		postCollected = !postCollected
		postsCollected[this.data.pid] = postCollected
		// 更新文章是否的缓存
		wx.setStorageSync("posts_Collected", postsCollected)
		// 更新数据绑定变量 实现切换图片
		this.setData({
			collected: postCollected
		})

		// 调用交互反馈接口
		wx.showToast({
			title: postCollected ? "收藏成功" : "取消成功",
			duration: 2000
		})
	},

	onShareTap: function () {
		var itemList = [
			"分享到朋友圈",
			"分享到微信好友",
			"分享到qq好友",
			"分享到新浪微博"
		]
		wx.showActionSheet({
			itemList: itemList,
			itemColor: "#0188FB",
			success: function (res) {
				console.log(res)
			}
		})
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
		console.log("监听用户下拉动作---")
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		console.log("监听页面上拉触底事件---")
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		console.log("监听用户点击右上角分享---")
	}
})