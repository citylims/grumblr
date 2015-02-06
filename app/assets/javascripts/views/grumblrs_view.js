App.Views.GrumblrsView = Backbone.View.extend({
  el: '#grumble-list',

  events: {
    'click .add-grumble': 'showForm'
  },

  initialize: function(options) {
    this.listenTo(this.collection, 'add', this.addOne)
    // this.listenTo(this.collection, 'remove', this.addAll)
    this.listenTo(this.collection, 'reset', this.addAll)

    this.views = [];
    this.formView = options.formView;
    this.addAll();
  },

  addOne: function(grumble){
    var newGrumbleView = new App.Views.GrumblrView({ model: grumble });
    this.views.push(newGrumbleView)
    this.$el.append(newGrumbleView.el);
  },

  addAll: function(){
    this.collection.each(function(grumble){
      this.addOne(grumble);
    },this)
  },

  showForm: function() {
    this.formView.show();
  },

  filterByCID: function(cid){
    _.each(this.views, function(view){
        if( view.model.cid != cid){
          view.$el.hide();
        }
    });
  },


  unfilter: function(){
    this.$('.grumble').show();
  }
});
