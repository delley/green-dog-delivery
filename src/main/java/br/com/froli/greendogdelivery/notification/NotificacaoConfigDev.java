package br.com.froli.greendogdelivery.notification;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!PRD")
public class NotificacaoConfigDev implements Notificacao {

	@Override
	public boolean envioAtivo() {
		return false;
	}

}
