$(document).ready(function () {
 // Ajax call to Register
 $(".signupForm").ajaxForm({
  url: Ns_Ajax_Call() + "?v=signup",
  dataType: "text",
  beforeSend: function () {
   // alert("go");
   $(".signupForm .btn-primary").attr("disabled", true);
  },
  success: function (e) {
   try {
    var obj = $.parseJSON(e);
    // $('.ajax-return-login').html('');
    $.each(obj, function (key, value) {
     $(".form-control").removeClass("error");
     $(".authfy-panel")
      .find("." + value.class)
      .addClass("error");
     if (value.note) {
      $(".ajax-return").html(value.note);
     }
    });
    $(".signupForm .btn-primary").attr("disabled", false);
   } catch (e) {
    window.scrollTo(0, 0);
    location.reload();
   }
  },
 });
 // Ajax call to Login
 $(".loginForm").ajaxForm({
  url: Ns_Ajax_Call() + "?v=login",
  dataType: "text",

  beforeSend: function () {
   $(".loginForm .btn-primary").attr("disabled", true);
  },
  success: function (e) {
   try {
    var obj = $.parseJSON(e);

    $.each(obj, function (key, value) {
     $(".form-control").removeClass("error");
     $(".authfy-panel")
      .find("." + value.class)
      .addClass("error");
     $(".ajax-return-login").html(value.note);
    });
    $(".loginForm .btn-primary").attr("disabled", false);
   } catch (e) {
    window.scrollTo(0, 0);
    location.reload();
   }
  },
});