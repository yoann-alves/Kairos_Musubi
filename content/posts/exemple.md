---
date: "2026-04-01T12:00:00+02:00"
title: "Exemple Complet de Markdown"
draft: true
showToc: true
---

# Titre H1

Ce post sert d'exemple pour illustrer les capacités de rendu Markdown de votre blog.

## Mise en forme du texte

Voici les styles de base :

- **Gras** avec `**Gras**`
- _Italique_ avec `*Italique*`
- **_Gras et Italique_** avec `***Gras et Italique***`
- ~~Barré~~ avec `~~Barré~~`

## Listes

### Liste non ordonnée

- Élément 1
- Élément 2
  - Sous-élément A
  - Sous-élément B
- Élément 3

### Liste ordonnée

1. Premier
2. Deuxième
3. Troisième

### Liste de tâches

- [x] Tâche terminée
- [ ] Tâche en cours
- [ ] Tâche à faire

## Citations

> "Le code est comme l'humour. Quand on est obligé de l'expliquer, c'est qu'il est mauvais."  
> — _Cory House_

## Code

### Code en ligne

Utilisez des `backticks` pour du `code en ligne`.

### Blocs de code

Voici un exemple en **Rust** (en hommage à votre premier post) :

```rust
fn main() {
    println!("Hello, World!");
    let x = 42;
    println!("La valeur est {}", x);
}
```

Et un exemple en **Python** :

```python
def greet(name):
    return f"Bonjour, {name} !"

print(greet("Kairos"))
```

## Tableaux

| Nom    |  Langage  |        Niveau |
| :----- | :-------: | ------------: |
| Gemini |   Multi   |        Expert |
| Rust   | Systèmes  |        Avancé |
| Python | Scripting | Intermédiaire |

## Liens et Images

[Ceci est un lien vers Google](https://www.google.com)

![Image de démonstration](/images/profile.png)

## Séparateur

---

## Notes de bas de page

Voici une phrase avec une note de bas de page[^1].

[^1]: Ceci est le texte de la note de bas de page.
