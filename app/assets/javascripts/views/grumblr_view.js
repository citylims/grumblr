App.Views.GrumblrView = Backbone.View.extend({
  className: 'grumble',

  events: {
    'click span.destroy': 'onDestroy',
    'click span.show': 'show',
    'click span.author': 'author',
    'click span.edit': 'edit',
    'click span.update': 'update'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render)

    var source = $("#grumble-template").html();
    this.template = Handlebars.compile(source);
    var editSource = $("#edit").html();
    this.editTemplate = Handlebars.compile(editSource);

    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  },

  onDestroy: function() {
    this.model.destroy();
    this.remove();
  },

  show: function(){
    App.Routers.main.navigate('grumbles/' + this.model.cid);
    App.Views.grumbleListView.filterByCID(this.model.cid);
  },

  author: function(){
    App.Routers.main.navigate('grumbles/' + this.model.attributes.author);
    App.Views.grumbleListView.filterByAuthor(this.model.attributes.author);
  },

  edit: function(){

    $('.edit').hide();
    this.$el.append(this.editTemplate(this.model.toJSON()));
    // this.render();
    App.Routers.main.navigate('grumbles/' + this.model.cid + '/edit')

  },

  getFormData: function() {
    var data = {
      author: this.$("[name='author']").val(),
      avatar: this.$("[name='avatar']").val(),
      title: this.$("[name='title']").val(),
      content: this.$("[name='content']").val()
    };

    return data;
  },

  update: function(){
    var data = this.getFormData();
    this.model.save(data)
    // this.model.set("content", data['content'])
    this.$('#form').remove();
    $('.edit').show();
    App.Routers.main.navigate("");
  }

});
