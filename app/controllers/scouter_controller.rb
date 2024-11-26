class ScouterController < ApplicationController
  def create
    @scouter = Scouter.new(scouter_params)
    if @user.save
      render json: { message: "User created successfully" }
    else
      render json: { error: "Failed to create user" }
    end
  end

  private

  def scouter_params
    params.require(:scouter).permit(:username)
  end
end
