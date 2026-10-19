// var dateString = 'May 26, 2026';
var bookItemData = [
  {
    label: 'Dear Reader',
    value: 'Digital Book Only',
    price: '5',
    desc: 'Just the digital book, in PDF and ePub formats. Sent upon completion. No Substack access.',
    digital: true,
    physical: false,
    checked: false,
  },
  {
    label: 'Cub Reporter',
    value: 'Digital Book',
    price: '10',
    desc: 'Same as <span class="level">Dear Reader</span>, plus Substack access.',
    digital: true,
    physical: false,
    checked: false,
  },
  {
    label: 'Copy Editor',
    value: 'Physical Book Only',
    price: '15',
    desc: 'A paperback copy of the book, sent upon completion to your U.S./Canada address. No Substack access.',
    digital: false,
    physical: true,
    checked: false,
  },
  {
    label: 'Investigative Reporter',
    value: 'Physical Book',
    price: '20',
    desc: 'Same as <span class="level">Copy Editor</span>, plus Substack access.',
    digital: false,
    physical: true,
    checked: false,
  },
  {
    label: 'Managing Editor',
    value: 'Digital + Physical Book',
    price: '25',
    desc: 'Includes all of the above: digital and paperback books, plus Substack access.',
    digital: true,
    physical: true,
    checked: true,
  },
  {
    label: 'Editor-in-Chief',
    value: 'Digital + Autographed Book',
    price: '35',
    desc: 'Includes all of the above, except the book is signed by the author.',
    digital: true,
    physical: true,
    checked: false,
  },
  {
    label: 'Publisher',
    value: 'Digital + Autographed Book + Journalism Ph.D.',
    price: '100',
    desc: 'Includes all of the above, plus authentic Doctorate of Journalism.',
    digital: true,
    physical: true,
    checked: false,
  },
];

function initPayPalButton() {
  var shipping = 0;
  var itemOptions = document.querySelector("#smart-button-container #item-options");
  var quantity = parseInt();
  var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
  if (!isNaN(quantity)) {
    quantitySelect.style.visibility = "visible";
  }
  var orderDescription = '“Don’t Trust: Verify” Preorder';
  if(orderDescription === '') {
    orderDescription = 'Item';
  }
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'paypal',
    },
    createOrder: function(data, actions) {
      var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
      var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
      var noShip = itemOptions.options[itemOptions.selectedIndex].getAttribute("noship")
        ? 'NO_SHIPPING' : 'GET_FROM_FILE';

      var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
      if (quantitySelect.options.length > 0) {
        quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
      }
      else {
        quantity = 1;
      }

      tax *= quantity;
      tax = Math.round(tax * 100) / 100;
      var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
      priceTotal = Math.round(priceTotal * 100) / 100;
      var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

      return actions.order.create({
        application_context: { shipping_preference: noShip },
        purchase_units: [{
          description: orderDescription,
          amount: {
            currency_code: 'USD',
            value: priceTotal,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: itemTotalValue,
              },
              shipping: {
                currency_code: 'USD',
                value: shipping,
              },
              tax_total: {
                currency_code: 'USD',
                value: tax,
              }
            }
          },
          items: [{
            name: selectedItemDescription,
            unit_amount: {
              currency_code: 'USD',
              value: selectedItemPrice,
            },
            quantity: quantity
          }]
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {

        // Full available details
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

        // Show a success message within this page, e.g.
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '';
        element.innerHTML = '<h3>Thank you for your payment!</h3>';

        // Or go to another URL:  actions.redirect('thank_you.html');

      });
    },
    onError: function(err) {
      console.log(err);
    },
  }).render('#paypal-button-container');
}

function addBookItems() {
  bookItemData.forEach(function(bookItem) {
    var label = bookItem.label.replace(/ +/g, '-');
    $('#bookitems').append(
      '<div class="bookitem"><label class="form-control" for="' + label + '">' +
      '<input type="radio" id="' + label + '" name="bookitem" value="' + bookItem.value + '"' +
      (bookItem.checked ? ' checked' : '') +
      '>' + bookItem.label + ' - ' + '$' + bookItem.price + '</label>' +
      '<div class="bookdesc">' + bookItem.desc + '</div>'
    );
    $('#item-options').append(
      '<option value="' + bookItem.value + '" price="' + bookItem.price + '"' +
      (bookItem.physical ? '' : ' noship="1"') +
      (bookItem.checked ? ' selected' : '') +
      '>' + bookItem.value + ' - ' + bookItem.price + ' USD</option>'
    );
  });

  $('input[type=radio][name=bookitem]').change(function() {
    $('#item-options').val( this.value );
//     var price = $('#item-options option[value="' + this.value + '"]')[0].getAttribute('price');
//     var el = $('[data-funding-source=paylater]').parentElement;
//     if (price && price >= 30) {
//       el.hidden = true;
//     }
//     else {
//       el.hidden = false;
//     }
  });
}


/* 
function lastModified() {
  $('#last_modified').html( dateString );
}
 */

$(document).ready(function () {
  addBookItems();
  initPayPalButton();
  setLastMod('#last_modified')
//   lastModified();
});
