define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),

        TemplateMixins = require('require/backbone/mixins/template');

    return Backbone.View.extend({
        events: {
            'click .js-cancel': 'handleCancel',
            'click .js-confirm': 'handleConfirm'
        },

        removalDelay: 300,

        initialize: function(options) {
            this.template = options.template || this.template;
            this.removalDelay = options.hasOwnProperty('removalDelay') ? options.removalDelay : this.removalDelay;
        },

        handleCancel: function(e) {
            e.preventDefault();
            this.trigger('cancel');
        },

        handleConfirm: function(e) {
            e.preventDefault();
            this.trigger('confirm');
        },

        show: function() {

            var self = this,
                deferred = new $.Deferred();

            this.render();
            // Override our $el with the rendered results
            this.setElement(this.$el.children());

            $.magnificPopup.open({
                items: {
                    src: this.$el
                },
                type: 'inline',
                fixedContentPos: true,
                closeMarkup: '<i class="mfp-close default-mfp-close ico-circle-cross ico--medium"></i>',
                alignTop: true,
                removalDelay: this.removalDelay,
                mainClass: 'modal__animation',
                callbacks: {
                    close: deferred.reject
                }
            });

            this.on('cancel', function() {
                deferred.reject();
            });

            this.on('confirm', function() {
                deferred.resolve();
            });

            return deferred.promise().always(function() {

                $.magnificPopup.close();

                // Turn off event listeners
                self.off('cancel');
                self.off('confirm');
            });
        }
    }).mixin(
        TemplateMixins.WithTemplate
    );
});
