FROM node:20-bullseye-slim

# Arguments
ARG USER=backend-homework
ARG USER_HOME=/home/$USER
ARG VOLUME=/home/volume
ARG SHELL=/bin/bash

RUN apt-get update
RUN npm install -g npm

# Initial OS configuration
RUN apt-get install -y locales \
    && sed -i 's/^# *\(en_US.UTF-8\)/\1/' /etc/locale.gen \
    && locale-gen
RUN apt-get install -y sudo lsb-release git git-lfs curl zip unzip jq
RUN apt-get install -y python3-pip
RUN pip3 install --upgrade pip

# Set up non root user
RUN echo "$USER ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN useradd -ms $SHELL $USER
RUN mkdir -p $VOLUME \
    && chown -R $USER:$USER $VOLUME

# Set up SSH keys
RUN mkdir -p $USER_HOME/.ssh
RUN ln -s /run/secrets/gitlab_ssh_private_key $USER_HOME/.ssh/gitlab
RUN chown -R $USER:$USER $USER_HOME/.ssh

# Preserve bash history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo $SNIPPET >> "/root/.bashrc" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R $USER /commandhistory \
    && echo $SNIPPET >> "$USER_HOME/.bashrc"
