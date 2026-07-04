package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = CardPrimaryLight,
    onPrimary = CardPrimaryTextLight,
    primaryContainer = CardPrimaryLight,
    onPrimaryContainer = CardPrimaryTextLight,
    secondary = DarkCardLight,
    onSecondary = Color.White,
    secondaryContainer = DarkCardLight,
    onSecondaryContainer = DarkCardTextLight,
    tertiary = HighlightLight,
    onTertiary = HighlightTextLight,
    tertiaryContainer = HighlightLight,
    onTertiaryContainer = HighlightTextLight,
    background = BgLight,
    onBackground = TextMainLight,
    surface = CardSecondaryLight,
    onSurface = TextMainLight,
    surfaceVariant = CardTertiaryLight,
    onSurfaceVariant = TextSecondaryLight,
    outline = BorderLight,
    outlineVariant = BorderLight
)

private val DarkColorScheme = darkColorScheme(
    primary = CardPrimaryDark,
    onPrimary = CardPrimaryTextDark,
    primaryContainer = CardPrimaryDark,
    onPrimaryContainer = CardPrimaryTextDark,
    secondary = DarkCardDark,
    onSecondary = Color.White,
    secondaryContainer = DarkCardDark,
    onSecondaryContainer = DarkCardTextDark,
    tertiary = HighlightDark,
    onTertiary = HighlightTextDark,
    tertiaryContainer = HighlightDark,
    onTertiaryContainer = HighlightTextDark,
    background = BgDark,
    onBackground = TextMainDark,
    surface = CardSecondaryDark,
    onSurface = TextMainDark,
    surfaceVariant = CardTertiaryDark,
    onSurfaceVariant = TextSecondaryDark,
    outline = BorderDark,
    outlineVariant = BorderDark
)

@Composable
fun MyApplicationTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  // Disable dynamic color for custom theme
  dynamicColor: Boolean = false,
  content: @Composable () -> Unit,
) {
  val colorScheme =
    when {
      dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
        val context = LocalContext.current
        if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
      }

      darkTheme -> DarkColorScheme
      else -> LightColorScheme
    }

  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}
