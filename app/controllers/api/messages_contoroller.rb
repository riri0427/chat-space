class Api::MessagesController < ApplicationController
  def index
    @messages = Message.includes(:user)
    @new_message = Message.where('id > ?', params[:message][:id])
  end
end
