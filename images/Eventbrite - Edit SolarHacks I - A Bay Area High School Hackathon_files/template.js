define(function(require) {
    'use strict';

    function WithTemplate(options) {

        this.after('initialize', function() {

            this.template = this.template || options.template;

            if (!this.template) {
 
                throw new Error('Missing template function');
            }
        });

        this.around('render', function(render) {
            this.$el.html(this.template(this.getContextData(), this.getTemplateOptions()));
            render();
            return this;
        });

        this.setDefaults({
            getContextData: function() {
                if (this.model) {
                    return this.model.toJSON();
                }
                return {};
            },
            getTemplateOptions: function() {
                // You can override this to pass in options to the Template ctor
                return options.templateOptions || {};
            }
        });
    }

    return {
        WithTemplate: WithTemplate
    };
});
