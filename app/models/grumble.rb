class Grumble < ActiveRecord::Base
  validates_presence_of :title, :content, :author, :avatar
end
