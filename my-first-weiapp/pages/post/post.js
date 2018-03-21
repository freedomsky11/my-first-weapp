// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    content: {},
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化options为页面跳转所带来的参数 
    let id = options.id;  //options.id为上个页面传来的参数
    let that = this;    //在请求数据时setData使用
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetGraphic',
        id: id,
      },
      method: 'GET',
      success: function (res) {
        let post = that.data.post;
        post = res.data;
        let content = JSON.parse(post.content);
        let dt = Number(new Date()) - Number(post.time);
        let time;
        if (dt > 24 * 60 * 60 * 1000) {
          dt = new Date(Number(post.time));
          time = dt.toLocaleDateString().replace(/\//g, "-") + " " + dt.toTimeString().substr(0, 8)
        } else {
          if (dt > 1 * 60 * 60 * 1000) {
            time = Math.floor(dt / (1 * 60 * 60 * 1000)) + ' 小时前';
          } else {
            if (dt > 5 * 60 * 1000) {
              time = Math.floor(dt / (1 * 60 * 1000)) + ' 分钟前';
            } else {
              time = '刚刚';
            }
          }
        }
        that.setData({
          post,
          content,
          time,
          id
        });
        console.log(post);
        console.log(content);
      }
    });
    // 获取推荐页面
    wx.request({
      url: 'https://im.meiriv.com/test/get.php',
      data: {
        type: 'GetAll',
        page: 1,
        count: 20
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: { apikey: 'a37c01591e47494fe320137dbc0fd423' }, // 设置请求的 header
      success: function (res) {
        // success
        let list= [];

        for (let i = 0;i < 3;i++) {
          let index = Math.floor(Math.random() * 20);
          if (res.data[index].id == id) {
            i--;
          } else {
            list.push(res.data[index]);
          }
        };
        console.log(list);
        that.setData({
          list: list
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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
    console.log(this.data.id);
    let path = '../post/post?id=' + this.data.id;
    return {
      title: '阅读小程序'
    }
  }
})