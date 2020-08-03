from django_auth_ldap.backend import LDAPBackend


class CustomLDAP (LDAPBackend):
    def authenticate_ldap_user(self, ldap_user, password):
        print("logueando con LDAP")
        user = LDAPBackend().authenticate_ldap_user(ldap_user, password)

        if user:
            print("entro -----------")

        return user

