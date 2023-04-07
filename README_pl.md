[English](https://github.com/ChasmSolacer/Haxball-Client-Expansion/blob/master/README.md#haxball-client-expansion)
# Haxball-Client-Expansion
### Uwaga: to zadziała tylko w przeglądarkach opartych na Chromium (Chrome, Edge, Brave, itp.)
Plik `game-min.js` jest umieszczony na stronie haxball.com/play.<br>
Aby go zmodyfikować, musi zostać zastąpiony

## Instrukcja
### 1. Pobierz repozytorium
- Naciśnij zielony przycisk `Code` → `Download ZIP`.

![Pobierz ZIP](https://user-images.githubusercontent.com/46286197/215098635-7506d00a-2649-48ef-92aa-2892205a0ddd.png)
- Wypakuj pobrany plik .zip do jakiegoś pustego folderu.
- Nie zmieniaj nazw plików i folderów w środku!

### 2. Otwórz przeglądarkę Chromium (Chrome, Edge, Brave, itp.)
#### Włącz [Lokalne Zastąpienia](https://developer.chrome.com/blog/new-in-devtools-65/#overrides):
- Przejdź do https://www.haxball.com/play.
- Naciśnij F12, aby otworzyć panel narzędzi.
- Wybierz zakładkę `Źródła`.
- Otwórz kartę `Zastąpienia`.

![Otwórz Zastąpienia](https://user-images.githubusercontent.com/46286197/230602334-765266de-6b4f-4b5a-9c8c-6333f574dd36.png)
- Naciśnij `Wybierz folder dla zastąpień`.

![Wybierz folder dla zastąpień](https://user-images.githubusercontent.com/46286197/230602819-2b8cf3ba-fa73-4960-96fd-be18b0eb06c6.png)
- Wybierz folder z rozpakowanym plikiem zip – ten, co zawiera folder `www.haxball.com`.
- Naciśnij `Zezwalaj`, aby dać narzędziu dostęp do folderów.

![Naciśnij Zezwalaj](https://user-images.githubusercontent.com/46286197/230603501-2fe09d7d-19ba-4f27-afad-6997cd2c3d9b.png)
- To podmieni plik game-min.js.
- Teraz **odśwież stronę**. Powinny nastąpić widoczne zmiany (np. lista pokojów zajmująca całe okno).
- Wskazówka: zastąpienia zostają po restarcie przeglądarki i działają we wszystkich jej oknach, dzięki temu trzeba to robić tylko raz. Następnym razem wejdź na Haxballa, naciśnij F12 i odśwież stronę. Zmiany powinny być po tym widoczne.

### 3. Dodawanie fragmentów (nieobowiązkowe)
- Fragmenty pozwalają na zapisywanie plików js na potem i uruchamianie ich jednym kliknięciem.
- Naciśnij F12, aby otworzyć panel narzędzi.
- Wybierz zakładkę `Źródła`.
- Otwórz kartę `Fragmenty`.

![Otwórz Fragmentyb](https://user-images.githubusercontent.com/46286197/230608281-43c4fa5d-6eb7-4d4a-8189-ad3a520fe7df.png)
- Naciśnij `Nowy fragment`

![Naciśnij Nowy fragment](https://user-images.githubusercontent.com/46286197/230608837-b500e47b-26e7-4ad5-a794-199e12b252b4.png)
- Pojawi sie nowy plik z fragmentem.
- Wklej fragment kodu, który chcesz uruchomić i naciśnij przycisk z trójkątem poniżej (lub naciśnij Ctrl+Enter), aby uruchomić fragment.

![Wklej kod i uruchom](https://user-images.githubusercontent.com/46286197/230609759-e80f906d-173b-4781-8ac2-7c06767956c4.png)
- Fragmenty są zachowywane podobnie jak zastąpienia, co pozwala na szybki dostęp do nich.

UWAGA: wszystko się posypie po aktualizacji Haxballa.
