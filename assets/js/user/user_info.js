$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称必须在1-6个字符之间"
            }
        }


    })
    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 点击重置按钮
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo()
    })
    // 监听表单的提交事件
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg("更新用户失败")
                }
                layer.msg("更新用户成功");
                window.parent.getUserInfo()
            }
        })
    })
})