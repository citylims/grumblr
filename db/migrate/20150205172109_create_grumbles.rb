class CreateGrumbles < ActiveRecord::Migration
  def change
    create_table :grumbles do |t|
      t.string :title
      t.text :content
      t.string :author
      t.string :avatar
    end
  end
end
