// index.js
// 获取应用实例
const app = getApp();

let url = 'https://im.meiriv.com/test/get.php';
let page = 1;
let count = 10;

// 获取数据的方法，具体怎么获取列表数据大家自行发挥
const GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      type: 'GetAll',
      page: page,
      count: count,
    },
    method: 'GET',
    success: function (res) {
      //console.info(that.data.list);
      let list = that.data.list;
      if ( page == 1 ) {
        for (let i = 4; i < res.data.length; i++) {
          list.push(res.data[i]);
        }
      } else {
        for (let i = 0; i < res.data.length; i++) {
          list.push(res.data[i]);
        }
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
      console.log(list);
    }
  });
}

Page({
  data: {
    cover: app.data.cover,
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    let that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    let that = this;
    GetList(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    // page = 1;
    // this.setData({
    //   list: [],
    //   scrollTop: 0
    // });
    // GetList(this)
  }
})

// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function (e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
