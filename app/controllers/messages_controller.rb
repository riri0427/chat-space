class MessagesController < ApplicationController
  def index
  end

  def create
    @message = Message.create(message_params)
  end
end
