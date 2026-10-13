$(document).ready(function () {
    const answers = $('.answer');

    $('.toggle-answer').on('click', function () {
        const $button = $(this);
        const $answer = $button.next('.answer');

        if ($answer.is(':visible')) {
            $answer.slideUp();
            $button.text('Show Answer');
        } else {
            $answer.slideDown();
            $button.text('Hide Answer');
        }
    });

    answers.hide();
});
