class Api::ServersController < ApplicationController
  before_action :require_logged_in
  
  def index
    @servers = current_user.servers
    @servers += current_user.owned_servers
    render :index
  end

  def show
    @server = Server.find(params[:id])
    render :show
  end

  def create
    @server = Server.new(server_params)
    @server.photo.attach(params[:server][:photo]) if params[:server][:photo]

    if @server.save
      ServerMember.create({member_id: @server.owner_id, server_id: @server.id})
      Channel.create({name: "general", server_id: @server.id})
      render :show
    else
      render json: ["Thought you'd get away with that, huh?"], status: 422
    end
  end

  def update
    @server = current_user.owned_servers.find_by(id: params[:id])
    if @server
      if @server.update(server_params)
        render :show
      else
        render json: ["Really? A blank name? No."], status: 422
      end
    else
      render json: ["How would you feel if I tried to change YOUR hideout? Yeah, didn't think so"], status: 404
    end
  end

  def join
    @server = Server.find_by(invite_code: params[:inviteCode])
    
    if @server
      if current_user.servers.include?(@server)
        render json: ["Fun fact: You're already part of this server"], status: 422
      else
        ServerMember.create({member_id: current_user.id, server_id: @server.id})
        # render json: @reward
        render :show
      end
    else
      render json: ["Incorrect code. big womp"], status: 422
    end
  end

  def leave
    @server = current_user.servers.find_by(id: params[:serverId])
    @server_membership = ServerMember.find_by(member_id: current_user.id, server_id: params[:serverId])
    
    if @server && @server_membership
      @server_membership.destroy
      render json: @server.id
    else
      render json: ["Could not leave server. Alternatively you can just like this server"], status: 422
    end
  end
  
  def destroy
    @server = current_user.owned_servers.find_by(id: params[:id])
    if @server
      @server.destroy
    else
      render json: ["Don't burn down someone else's hideout! That's rude"], status: 404
    end
  end

  private
  def server_params
    params.require(:server).permit(:name, :owner_id, :photo, :invite_code)
  end
end
