package br.com.froli.greendogdelivery.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.froli.greendogdelivery.domain.Cliente;
import br.com.froli.greendogdelivery.domain.Pedido;

@Component
public class EnviaNotificacao {
	
	@Autowired
	private Notificacao notificacao;

	public void enviaEmail(Cliente cliente, Pedido pedido) {
		if (notificacao.envioAtivo()) {
			System.out.println("Notificação enviada!");
		} else {
			System.out.println("Notificação desligada!");
		}
	}
}
