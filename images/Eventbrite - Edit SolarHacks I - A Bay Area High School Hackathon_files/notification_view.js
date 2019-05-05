define(function(require) {
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        $ = require('jquery'),
        gettext = require('gettext'),

        DELAY_CLOSE_TIME = 10000,

        template = require('hb!./notification_view.handlebars');

    return Marionette.ItemView.extend({

        config: {
            //the selector is part of another instance of this view
            notificationBarSelector: '.js-feature-prompt-notification-bar',
            essentials: gettext('Success! You now have the easy-to-use Eventbrite Essentials.'),
            professional: gettext('Success! You now have the power and flexibility of Eventbrite Professional.'),
            premium: gettext('An event expert will get in touch as soon as possible. In the meantime, try Eventbrite Professional.')
        },

        events: {
            'click .js-notification-close-button': '_handleCloseButtonClick'
        },

        template: template,

        templateHelpers: function() {
            var message = this.config.professional;

            if (this.options.promptType == 'existingUserPrompt' && this.options.upgradedTo) {
                message = this.config[this.options.upgradedTo] || this.config.professional;
            } else if (this.options.confirmation) {
                message = this.options.confirmation || this.config.professional;
            }

            return {
                message: message
            };
        },

        _handleCloseButtonClick: function() {
            this.closeNotification();
        },

        onRender: function() {
            //Remove any other notification created
            $(this.config.notificationBarSelector).remove();

            _.delay(this.closeNotification.bind(this), DELAY_CLOSE_TIME);
        },

        closeNotification: function() {
            this.remove();
        }
    });
});
