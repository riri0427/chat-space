class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    @new_messages = Message.where('id > ?', params[:id]).where(group_id: group.id)
  end
end
