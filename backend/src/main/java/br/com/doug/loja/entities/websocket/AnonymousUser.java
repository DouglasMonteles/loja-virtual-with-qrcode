package br.com.doug.loja.entities.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.security.Principal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnonymousUser implements Serializable, Principal {
    @Serial
    private static final long serialVersionUID = -4624659927759334379L;

    private String name;

}
