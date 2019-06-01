class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = Message.new(message_params)
    @group = @message.group
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
