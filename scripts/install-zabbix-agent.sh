#!/bin/bash

# chmod +x install_zabbix_agent.sh
# sudo ./install_zabbix_agent.sh

# Define Zabbix Server IP and Hostname for the agent
ZABBIX_SERVER_IP="10.114.1.6"
AGENT_HOSTNAME="$(hostname)" # marvinhuber-pi-zabbix-agent

echo "Starting Zabbix Agent installation..."

# Check if the script is running as root
if [ "$(id -u)" != "0" ]; then
  echo "This script must be run as root. Please try again with sudo or as root user."
  exit 1
fi

# Proceed with Zabbix Agent installation
echo "Downloading Zabbix Agent..."
wget https://repo.zabbix.com/zabbix/6.4/debian/pool/main/z/zabbix-release/zabbix-release_6.4-1%2Bdebian12_all.deb

echo "Installing Zabbix repository configuration package..."
dpkg -i zabbix-release_6.4-1+debian12_all.deb

echo "Updating package lists..."
apt update

echo "Installing zabbix agent..."
apt install -y zabbix-agent

# Configure Zabbix Agent
echo "Configuring Zabbix Agent..."
sed -i "s/^Server=127.0.0.1/Server=${ZABBIX_SERVER_IP}/" /etc/zabbix/zabbix_agentd.conf
sed -i "s/^ServerActive=127.0.0.1/ServerActive=${ZABBIX_SERVER_IP}/" /etc/zabbix/zabbix_agentd.conf
sed -i "s/^Hostname=Zabbix server/Hostname=${AGENT_HOSTNAME}/" /etc/zabbix/zabbix_agentd.conf

echo "Restarting zabbix-agent service..."
systemctl restart zabbix-agent

echo "Enabling zabbix-agent service..."
systemctl enable zabbix-agent

echo "Zabbix Agent installation script finished."
