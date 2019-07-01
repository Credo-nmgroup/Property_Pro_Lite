// cuurency enter
var currencyInput = document.querySelector('input[ type = "currency"]');
var currency = 'USD';

currencyInput.addEventListener('focus', onFocus);
currencyInput.addEventListener('blur', onBlur);

const localStringToNumber = s =>{
    return Number(String(s).replace(/[^0-9.-]+/g, ''));
};

const onFocus = e =>{
    var value = e.target.value;
    e.target.value = value ? localStringToNumber(value) : '';
};

const onBlur = e =>{
    var value = e.target.value;
    const options = {
        maximumFractionDigits : 2,
       
        currency              : currency,
       
        style                 : 'cuurency',
       
        currencyDisplay       : 'symbol'
          
    };
    e.target.value = value ? localStringToNumber(value).toLocaleString(undefined, options) : ''; 
};