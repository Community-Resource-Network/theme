function pageLoaded() {
  Stripe.setPublishableKey("");
  console.log("done");
  $("#stripe-form").submit(function (e) {
    e.preventDefault();

    formData = {
      number: $(".card-number").val(),
      cvc: $(".cvc").val(),
      exp_month: $("input[name='expiry-month']").val(),
      exp_year: $("input[name='expiry-year']").val(),
      name: $("input[name='card-holders-name']").val(),
    };

    Stripe.card.createToken(formData, function (status, response) {
      $(".card-number").val("");
      $(".cvc").val("");
      $("input[name='expiry-month']").val("");
      $("input[name='expiry-year']").val("");
      $("input[name='token']").val(response.id);
      if (response.error) {
        $("#error-text").text(response.error.message);
        $("#error-box").slideDown();
      } else {
        var token = response.id;
        $("input[name='token']").val(token);
        e.currentTarget.submit();
      }
    });
  });
}