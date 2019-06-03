require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do

    context 'can save' do
      it "is valid with a content, image" do
        expect(build(:message)).to be_valid
      end

      it "is valid with a image" do
        message = build(:message, content: "")
        expect(message).to be_valid
      end

      it "is valid with a content" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without a content, image" do
        message = build(:message, content: "", image: nil)
        message.valid?
        expect(message.errors[:content]).to include("translation missing: ja.activerecord.errors.models.message.attributes.content.blank")
      end

      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('translation missing: ja.activerecord.errors.models.message.attributes.group.required')
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('translation missing: ja.activerecord.errors.models.message.attributes.user.required')
      end

    end
  end

end
