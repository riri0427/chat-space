class MessagesController < ApplicationController
  def index
    @message = Message.new
    @group = @message.group
  end

  def create
    Message.create(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(group_id: params[:group_id])
  end
end
