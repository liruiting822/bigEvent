$(function () {
    var layer = layui.layer;
    // 获取用户信息
    getUserInfo();
    // 实现退出功能
    $("#btnLogout").on("click", function () {
        layer.confirm('确认退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem("token");
            location.href = "./login.html"


            layer.close(index);
        });
    })


})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            // console.log(res)
            if (res.status != 0) {
                return layer.msg("获取用户信息失败")
            }
            renderAvatar(res.data)
        }


    })
}
// 渲染头像
function renderAvatar(user) {
    console.log(user);
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎  " + name);
    // 按需渲染用户头像
    if (user.user_pic !== '') {
        $(".text-avatar").hide();
        $(".layui-nav-img").prop("src", user.user_pic).show();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show();
    }

}