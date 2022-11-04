// function checkScrollPassive() {
//     console.log('checking scroll passive')
//     document.addEventListener('touchstart', function () {
//         console.log('scroll')
//     }, true);
// }

function loadall() {
    // 'use strict'
    // Toggles
    // checkScrollPassive();

    // Input Masks
    $('#dateMask').mask('99/99/9999');
    $('#phoneMask').mask('(999) 999-9999');
    $('#ssnMask').mask('999-99-9999');

    // Datepicker
    $('.fc-datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true
    });

    $('#datepickerNoOfMonths').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: 2
    });

    // Time Picker
    $('#tpBasic').timepicker();
    $('#tp2').timepicker({
        'scrollDefault': 'now'
    });
    $('#tp3').timepicker();

    $('#setTimeButton').on('click', function() {
        $('#tp3').timepicker('setTime', new Date());
    });

    // Color picker
    $('#colorpicker').spectrum({
        color: '#17A2B8'
    });

    $('#showAlpha').spectrum({
        color: 'rgba(23,162,184,0.5)',
        showAlpha: true
    });

    $('#showPaletteOnly').spectrum({
        showPaletteOnly: true,
        showPalette: true,
        color: '#DC3545',
        palette: [
            ['#1D2939', '#fff', '#0866C6', '#23BF08', '#F49917'],
            ['#DC3545', '#17A2B8', '#6610F2', '#fa1e81', '#72e7a6']
        ]
    });


    // Rangeslider
    if ($().ionRangeSlider) {
        $('#rangeslider1').ionRangeSlider();

        $('#rangeslider2').ionRangeSlider({
            min: 100,
            max: 1000,
            from: 550
        });

        $('#rangeslider3').ionRangeSlider({
            type: 'double',
            grid: true,
            min: 0,
            max: 1000,
            from: 200,
            to: 800,
            prefix: '$'
        });

        $('#rangeslider4').ionRangeSlider({
            type: 'double',
            grid: true,
            min: -1000,
            max: 1000,
            from: -500,
            to: 500,
            step: 250
        });
    }

};

$(function() {
    setTimeout(loadall, 1000);
});